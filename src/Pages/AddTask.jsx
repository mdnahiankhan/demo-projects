import React from 'react';

const AddTask = () => {
    return (
        <section className="p-6 dark:text-gray-100">
            <form noValidate="" className="container w-full max-w-xl p-8 mx-auto space-y-6 rounded-md shadow dark:bg-gray-200 ng-untouched ng-pristine ng-valid text-black">
                <h2 className="w-full text-3xl font-bold leading-tight">Add Your Task</h2>
                <div>
                    <label htmlFor="name" className="block mb-1 ml-1">Your Task</label>
                    <input id="name" type="text" placeholder="Your Task" required="" className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-400 dark:bg-gray-100" />
                </div>
                <div>
                    <fieldset className="w-full space-y-1 dark:text-gray-100">
                        <label htmlFor="files" className="block text-sm font-medium text-black">Attach Your task image</label>
                        <div className="flex">
                            <input type="file" name="files" id="files" className="px-8 py-12 border-2 border-dashed rounded-md dark:border-gray-700 dark:text-gray-400 dark:bg-gray-200" />
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