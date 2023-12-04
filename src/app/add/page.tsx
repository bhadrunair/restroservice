"use client"

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type Option = {
    title:string,
    additionalPrice:number
}

const AddPage = () => {

    const { data: session, status } = useSession();
    const [inputs,setInputs] = useState({
        title:"",
        desc:"",
        price:0,
        catSlug:0,
    });

    const [option, setOption] = useState<Option>({
        title:"",
        additionalPrice: 0,
    });

    const [options, setOptions] = useState<Option[]>([]);
    const [file, setFile] = useState<File>();

    const router = useRouter();

    if(status === "loading"){
        return <p>Loading...</p>;
    }

    if(status === "unauthenticated" || !session?.user.isAdmin){
        router.push("/");
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputs(prev => {
            return{...prev,[e.target.name]:e.target.value}
        });
    };

    const changeOption = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputs(prev => {
            return{...prev,[e.target.name]:e.target.value}
        });
    };

    const handleChangeImg = (e:React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const item = (target.files as FileList)[0];
        setFile(item);
    }

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const res = await fetch("http://localhost:3000/api/products",{
                method:"POST",
                body:JSON.stringify({
                    ...inputs,
                    options
                })
            });
            const data = await res.json();
            // router.push(`/product/${data.id}`);
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div>
        <form className='shadow-lg flex flex-wrap gap-4 p-8' onSubmit={handleSubmit}>
        <h1>Add New Product</h1>
        <div className='w-full flex flex-col gap-2'>
            <label>Title</label>
            <input onChange={handleChange} className="ring-1 ring-red-200 p-2 rounded-sm" type='text' name='title'/>
        </div>
        <div className='w-full flex flex-col gap-2'>
            <label>Image</label>
            <input className="ring-1 ring-red-200 p-2 rounded-sm" type='file' onChange={handleChangeImg}/>
        </div>
        <div className='w-full flex flex-col gap-2'>
            <label>Desc</label>
            <textarea onChange={handleChange} name='desc'/>
        </div>
        <div className='w-full flex flex-col gap-2'>
            <label>Price</label>
            <input onChange={handleChange} className="ring-1 ring-red-200 p-2 rounded-sm" type='number' name='price'/>
        </div>
        <div className='w-full flex flex-col gap-2'>
            <label>Category</label>
            <input onChange={handleChange} className="ring-1 ring-red-200 p-2 rounded-sm" type='text' name='catSlug'/>
        </div>
        <div className='w-full flex flex-col gap-2'>
            <label>Options</label>
            <div>
                <input onChange={changeOption} type='text' className="ring-1 ring-red-200 p-2 rounded-sm" placeholder='Title' name='title'/>
                <input onChange={changeOption} type='number' className="ring-1 ring-red-200 p-2 rounded-sm" placeholder='Additional Price' name='additionalPrice'/>
            </div>
            <button className='w-52 bg-red-500 text-white p-2'
            onClick={() => setOptions((prev) => [...prev, option])}>Add Option</button>
        </div>
        <div>
            {options.map(item => (
                <div className='ring-1 p-2 ring-red-500 rounded-md cursor-pointer' key={item.title}
                onClick={() => setOptions(options.filter((opt) => opt.title !== item.title))}>
                    <span>Small</span>
                    <span>#2</span>
                </div>
            ))}
        </div>
        <button type='submit' className='p-2 w-full bg-red-500 text-white'>Submit</button>
        </form>
    </div>
  )
}

export default AddPage