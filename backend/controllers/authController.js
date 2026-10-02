import User from "../models/User.js";


export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, adminSecretCode } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and password.",
      });
    }

  
    const userExists = await User.findOne({ email: email.toLowerCase().trim() });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "A user with this email already exists.",
      });
    }

    // Determine role: Only assign "admin" or "team_member" if valid adminSecretCode is provided
    let assignedRole = "student";
    if (role === "admin" || role === "team_member") {
      const validSecret = process.env.ADMIN_INVITE_SECRET || "akgec_aws_admin_2026";
      if (adminSecretCode === validSecret) {
        assignedRole = role;
      } else {
        return res.status(403).json({
          success: false,
          message: "Invalid Admin Invite Secret. You cannot register as an admin or team member without a valid secret key.",
        });
      }
    }

    
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: assignedRole,
    });

    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      message: `Account registered successfully as ${user.role}!`,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password.",
      });
    }

   
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};


export const updateUserRole = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!["student", "team_member", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be student, team_member, or admin.",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: `User role updated to ${role} successfully!`,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
