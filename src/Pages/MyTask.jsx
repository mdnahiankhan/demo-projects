import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const MyTask = () => {
    const { data: tasks, isLoading, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            try {
                const res = await fetch('https://demo-projects-server.vercel.app/task')
                const data = await res.json();
                return data;
            }

            catch {

            }
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }
    const handleDelete = task => {
        fetch(`https://demo-projects-server.vercel.app/task/${task}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Task ${task} is deleted successfully`)
                }
            })
    }

    return (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
            <h2 className="mb-4 text-2xl font-semibold leading-tight text-black">My Tasks</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                    <thead className="dark:bg-gray-700">
                        <tr className="text-left">
                            <th className="p-3">No:</th>
                            <th className="p-3">Task Name</th>
                            <th className="p-3">Image</th>
                            <th className='p-3'>Delete</th>
                            <th className='p-3'>Updated Task</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map((task, i) => <tr key={task._id} className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-600">
                                <td className="p-3 text-lg">
                                    <p>{i + 1}</p>
                                </td>
                                <td className="p-3 text-lg">
                                    <p>{task?.taskname}</p>
                                </td>
                                <td className="p-3">
                                    <img alt="" className="w-12 h-12 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-violet-400 ring-offset-gray-800" src={task?.image} />
                                </td>
                                <td className="p-3">
                                    <button onClick={() => handleDelete(task._id)}>Delete</button>
                                </td>
                                <td>
                                    <Link to={`/updateTask/${task._id}`}>
                                        <button className='p-3'>Update</button>
                                    </Link>
                                </td>
                                <td className="p-3">
                                    <Link to={`/completedTask`}><button>Completed</button></Link>
                                </td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default MyTask;