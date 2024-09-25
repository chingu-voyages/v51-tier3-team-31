import axios from "axios";
import React from "react";

export default function NewExpenseGroupFormModal() {
    
    //Need to be moved somewhere else
    const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;
    const url = `${serverBaseUrl}/api/v1/expense-groups`;

    const [formData, setFormData] = React.useState(
    {name: "", description: "", budget: 0}
    )
    //Need to find type for event
    function handleChange(event :any) {
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [event.target.name]: event.target.value
        }
    })
    }

    function handleSubmit(event :any) {
        event.preventDefault()
        submitToApi()
    }

    function submitToApi() {
        axios
            .post(url, formData)
            .then((res) => {
            console.log('Success!', res)
            })
            .catch((error) => {
            console.error('Error fetching data:', error);
            });
    }

    return (
            <div className="fixed bottom-20">
                <div className="bg-gray-300 h-[200px] w-[290px] border border-indigo-900 shadow-md shadow-gray-600 relative cursor-pointer">
                    <form onSubmit={handleSubmit} className="p-3 flex flex-col">
                        <label htmlFor="name">Account name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            onChange={handleChange}
                            name="name"
                            id="name"
                        />
                        <label htmlFor="isFriendly">Description</label>
                        <textarea
                            placeholder="Description"
                            onChange={handleChange}
                            name="description"
                            id="description"
                        />
                        <button className="bg-indigo-900 text-gray-50 mt-2">Add</button>
                    </form>
                </div>
            </div>     
    );
}