import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Pencil, Trash } from "lucide-react";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() === "") {
      toast("Task cannot be empty", { description: "Please enter a valid task." });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: newTask }]);
    setNewTask("");
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id, text) => {
    setEditTaskId(id);
    setEditTaskText(text);
  };

  const handleUpdateTask = () => {
    if (editTaskText.trim() === "") {
      toast("Task cannot be empty", { description: "Please enter a valid task." });
      return;
    }
    setTasks(tasks.map((task) => (task.id === editTaskId ? { ...task, text: editTaskText } : task)));
    setEditTaskId(null);
    setEditTaskText("");
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Todo App</h1>
      <div className="mb-4">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="mr-2"
        />
        <Button variant="primary" onClick={handleAddTask}>
          Add Task
        </Button>
      </div>
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardHeader>
              <CardTitle>{task.text}</CardTitle>
            </CardHeader>
            <CardContent>
              {editTaskId === task.id ? (
                <div className="flex items-center space-x-2">
                  <Input
                    value={editTaskText}
                    onChange={(e) => setEditTaskText(e.target.value)}
                    placeholder="Edit task"
                  />
                  <Button variant="primary" onClick={handleUpdateTask}>
                    Update
                  </Button>
                </div>
              ) : (
                <p>{task.text}</p>
              )}
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => handleEditTask(task.id, task.text)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Edit</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => handleDeleteTask(task.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;