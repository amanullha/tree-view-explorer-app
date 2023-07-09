import { BiRightArrow, BiDownArrow } from 'react-icons/bi';
import { useEffect, useState } from 'react';

const SingleFolder = (params: any) => {

    const [open, setOpen] = useState(false)
    const [folderId, setFolderId] = useState('')
    const folder: any = params?.folder;
    const [subFolder, setSubfolder] = useState([])

    console.log("subFolders: ", folder);


    const handleFolderOpen = async(id: string) => {
        console.log("id ", id);

        
        if (open) {
            setOpen(false);
            setFolderId("");
            setSubfolder([]);
        }
        else {
            setOpen(true);
            setFolderId(id);
            await fetchData();
        }
    }



    // Fetch folders data
    const fetchData = async () => {
        try {
            const response = await fetch(`https://tree-view-xplorer.vercel.app/folders/structure/?paramId=${folderId}`);
            const data = await response.json();
            console.log("new data; ", data?.data?.subFolders);
            setSubfolder(data?.data?.subFolders);
        } catch (error) {
            console.error('Error fetching folders:', error);
        }
    };




    return (
        <li className='flex flex-col w-full p-5 ml-5 border border-rounded-4'>

            <div className="flex justify-between w-full px-5 py-5 gap-x-6">
                <div className="flex gap-x-4">

                    <div className="flex items-center min-w-0 gap-2 ">
                        <button onClick={() => handleFolderOpen(folder._id)} className='text-black'>
                            {
                                open ?
                                    <BiDownArrow />
                                    :
                                    <BiRightArrow />
                            }
                        </button>
                        <p className="text-sm font-semibold leading-6 text-gray-900">{folder?.name}</p>

                    </div>
                </div>
                <div className="">
                    <button className="text-sm leading-6 text-gray-900">create</button>
                </div>
            </div>

            <div>
                <ul>
                    {
                        open && subFolder?.length > 0 ?
                            <>
                                {/* subFolder?.map(fol=><SingleFolder key={fol._id} folder={fol}/>) */}
                                {
                                    subFolder?.map(f => {
                                        return (
                                            // <h1 className='text-black'>hello</h1>
                                            <SingleFolder key={f?._id} folder={f} />
                                        )
                                    })
                                }
                            </>
                            :
                            <></>

                    }
                </ul>
            </div>
        </li>

    );
};

export default SingleFolder;