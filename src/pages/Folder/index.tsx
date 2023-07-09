"use client"; // This is a client component 👈🏽
import SingleFolder from '@/components/singleFolder';
import { useEffect, useState } from 'react';

const Folder = () => {
    const [folders, setFolders] = useState<any>([]);

    useEffect(() => {
        // Fetch folders data
        const fetchData = async () => {
            try {
                const response = await fetch('https://tree-view-xplorer.vercel.app/folders/structure');
                const data = await response.json();
                setFolders(data.data);
            } catch (error) {
                console.error('Error fetching folders:', error);
            }
        };

        fetchData();
    }, []);
    console.log(folders);

    return (
        <div className='w-full'>
            <h1>Folder Structure</h1>
            <div className='w-full min-h-max' >

                {
                    <ul role="list" className="flex flex-col items-center justify-center w-full divide-y divide-gray-100">
                        {folders ? (
                            <SingleFolder
                                key={folders?._id}
                                folder={folders}
                            ></SingleFolder>
                        )
                            :
                            (
                                <p>No folders available.</p>
                            )}
                    </ul>
                }



            </div>
        </div>
    );
};

export default Folder;
