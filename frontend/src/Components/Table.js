import React from "react";

export const Table = (props) => {
  console.log(props);

  console.log(props.props);
  const tasks = props.props;
  props.props.map((task) => {
    console.log(task.email);
  });
  return (
    <>
      {props.props.length != 0 && (
        <div>
        <div className="container">
          <table className="text-left w-full min-w-full bg-gray-800 rounded-lg">
            <thead className="bg-gray-800 flex rounded-lg text-white w-full">
              <tr className="flex w-full mb-4">
                <th className="p-4 w-1/4">Task Name</th>
                <th className="p-4 w-1/4">Description</th>
                <th className="p-4 w-1/4">Due Date</th>
                <th className="p-4 w-1/4">Due Time</th>
              </tr>
            </thead>
            <tbody
              className={`bg-grey-light  ${tasks.length > 5 ? 'overflow-y-scroll' : 'overflow-y-auto'}`}
              style={{ maxHeight: "50vh" }}
            >
              {tasks.map((task) => (
                <tr className="bg-white flex w-full border " key={task._id}>
                  <td className="py-4 px-12 w-1/4">{task.task_name}</td>
                  <td className="py-4 px-12 w-1/4">{task.task_description}</td>
                  <td className="py-4 px-12 w-1/4">
                    {new Date(task.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-12 w-1/4">{task.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}
    </>
  );
};
