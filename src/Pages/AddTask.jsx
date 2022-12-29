import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
    const { register, handleSubmit } = useForm();

    const navigate = useNavigate()

    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const handleTask = data => {
        const image = data.image[0];
        const formdata = new FormData();
        formdata.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formdata
        })
            .then(res => res.json())
            .then(imgdata => {
                if (imgdata.success) {
                    const task = {
                        taskname: data.task,
                        image: imgdata.data.url
                    }

                    /* save to the database */

                    fetch('https://demo-projects-server.vercel.app/task', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(task)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.task} is successfully added.`)
                            navigate('/mytask')
                        })
                };
            })
    }
    return (
        <section className="p-6 dark:text-gray-100">
            <form onSubmit={handleSubmit(handleTask)} noValidate="" className="container w-full max-w-xl p-8 mx-auto space-y-6 rounded-md shadow dark:bg-gray-200 ng-untouched ng-pristine ng-valid text-black">
                <h2 className="w-full text-3xl font-bold leading-tight">Add Your Task</h2>
                <div>
                    <label htmlFor="name" className="block mb-1 ml-1">Your Task</label>
                    <input id="name" type="text" {...register('task')} placeholder="Your Task" required="" className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400 dark:bg-gray-100" />
                </div>
                <div>
                    <fieldset className="w-full space-y-1 dark:text-gray-100">
                        <label htmlFor="file" className="block text-sm font-medium text-black">Attach Your task image</label>
                        <div className="flex">
                            <input type="file"{...register('image')} className="px-8 py-12 border-2 border-dashed rounded-md dark:border-gray-700 dark:text-gray-400 dark:bg-gray-200" />
                        </div>
                    </fieldset>
                </div>
                <div>
                    <button type="submit" className="w-full px-4 py-2 font-bold rounded shadow focus:outline-none focus:ring hover:ring focus:ring-opacity-50 dark:bg-violet-400 focus:ring-violet-400 hover:ring-violet-400 dark:text-gray-100">Submit</button>
                </div>
            </form>
        </section>
    );
};

export default AddTask;