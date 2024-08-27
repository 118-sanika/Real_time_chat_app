// src/modules/Dashboard.js
import React from 'react';
import OIP from '../../assetes/OIP.jpg'; // Ensure the path is correct

const Dashboard = () => {
    const contacts = [
        { name: 'sanika', status: 'Available', img: OIP },
        // ... other contacts
    ];

    return (
        <div className='w-screen flex'>
            <div className='w-[25%] border h-screen bg-secondary'>
                <div className='flex items-center my-8 mx-14'>
                    <div className='border border-primary p-[2px] rounded-full'>
                        <img src={OIP} width={75} height={75} alt="User" />
                    </div>
                    <div className='ml-8'>
                        <h3 className='text-2xl'>Tutorials Dev</h3>
                        <p className='text-lg font-light'>My Account</p>
                    </div>
                </div>
                <hr />
                <div>
                    <div className='text-xl font-semibold my-4 mx-14'>Messages</div>
                    <div>
                        {contacts.map(({ name, status, img }) => (
                            <div key={name} className='flex items-center py-4 px-14 border-b border-b-gray-300'>
                                <div className='cursor-pointer flex items-center'>
                                    <div>
                                        <img src={img} width={60} height={60} alt={name} />
                                    </div>
                                    <div className='ml-6'>
                                        <h3 className='text-lg font-semibold'>{name}</h3>
                                        <p className='text-sm font-light text-gray-600'>{status}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='w-[50%] border h-screen bg-white flex flex-col items-center'>
                <div className='w-[75%] flex items-center bg-secondary h-[80px] my-14 rounded-full px-14 shadow-sm'>
                    <div className='cursor-pointer'>
                        <img src={OIP} width={40} height={40} alt="sanika" />
                    </div>
                    <div className='ml-6 mr-auto'>
                        <h3 className='text-lg'>sanika</h3>
                        <p className='text-sm font-light text-gray-600'>online</p>
                    </div>
                    <div className='cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone-incoming" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                            <path d="M15 9l5 -5" />
                            <path d="M15 5l0 4l4 0" />
                        </svg>
                    </div>
                </div>
                <div className='h-[75%] w-full overflow-scroll'>
                    <div className='p-14'>
                        <div className='max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6'>
                            lorem is a persojnnhdhjhd sbjfjidisjs kjdhshjkjnsnnsnsjdj
                        </div>
                        <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tr-xl ml-auto p-4 text-white mb-6'>
                            lorem is a persojnnhdhjhd sbjfjidisjs kjdhshjkjnsnnsnsjdj
                        </div>
                    </div>
                </div>
                <div className='p-14 w-full flex items-center'>
                    <input placeholder='Type a message...' className='w-[75%] p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none' />
                    <div className='ml-4 p-4 cursor-pointer bg-light rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-send" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M10 14l11 -11" />
                            <path d="M21 3l-6 18a0.55 .55 0 0 0 1 1l1 -1" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
