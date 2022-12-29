import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const CompletedTask = () => {


    const { register, handleSubmit } = useForm();

    const handleComment = data => {
        console.log(data);
    }

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
            <h2 className="mb-4 text-2xl font-semibold leading-tight text-black">Completed Tasks</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                    <thead className="dark:bg-gray-700">
                        <tr className="text-left">
                            <th className="p-3">No:</th>
                            <th className="p-3">Task Name</th>
                            <th className="p-3">Image</th>
                            <th className='p-3'>Delete</th>
                            <th className='p-3'>Complete</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map((task, i) => <tr key={task._id} className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-400 text-black">
                                <td className="p-3 text-lg">
                                    <p>{i + 1}</p>
                                </td>
                                <td className="p-3 text-lg font-bold">
                                    <p>{task?.taskname}</p>
                                </td>
                                <td className="p-3">
                                    <img alt="" className="w-12 h-12 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-violet-400 ring-offset-gray-800" src={task?.image} />
                                </td>
                                <td className="p-3 text-xl">
                                    <button onClick={() => handleDelete(task._id)}>Delete</button>
                                </td>
                                <td className="p-3 text-xl">
                                    <button>Completed</button>
                                </td>
                                <td className="p-3 text-xl">
                                    <Link to={`/mytask`}><button>Not Completed</button></Link>
                                </td>
                                <td>
                                    <div className="flex flex-col mx-auto">
                                        <form onSubmit={handleSubmit(handleComment)} noValidate="">
                                            <input id="name" type="text" {...register('comment')} placeholder="Your Task" required="" className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-gray-900 dark:bg-gray-100" />
                                            <button type="button" className="py-4 my-2 rounded-md dark:text-gray-100 font-bold">Comment</button>
                                        </form>
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default CompletedTask;