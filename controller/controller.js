const Task = require("../structure/task");
const Counter = require("../structure/counter");

const createResponse = (success, data, message) => ({ success, data, message });

// Function to generate the next available task ID
const getNextTaskId = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: "taskId" },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );
  return counter.value;
};

// Create a new task
exports.createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      const error = new Error("Title is required");
      error.statusCode = 400;
      return next(error);
    }

    const taskId = await getNextTaskId(); // Generate custom task ID

    const task = new Task({ id: taskId, title, description });
    await task.save();
    res
      .status(201)
      .json(createResponse(true, task, "Task created successfully"));
  } catch (error) {
    next(error);
  }
};

// Retrieve all tasks
exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.json(createResponse(true, tasks, "Tasks retrieved successfully"));
  } catch (error) {
    next(error);
  }
};

// Retrieve a task by custom ID
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({ id: req.params.id });
    if (!task) {
      const error = new Error("Task not found: Invalid id");
      error.statusCode = 404;
      return next(error);
    }
    res.json(createResponse(true, task, "Task retrieved successfully"));
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

// Update a task by custom ID
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
    });
    if (!task) {
      const error = new Error("Task not found: Invalid id");
      error.statusCode = 404;
      return next(error);
    }
    res.json(createResponse(true, task, "Task updated successfully"));
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

// Delete a task by custom ID
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ id: req.params.id });
    if (!task) {
      const error = new Error("Task not found: Invalid id");
      error.statusCode = 404;
      return next(error);
    }
    res.json(createResponse(true, null, "Task deleted successfully"));
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};
