import React from "react";
import Skeleton from "react-loading-skeleton";

const  SingleLoader =()=> {
    return (
    <div className="w-full flex flex-col justify-center lap:flex-row lap:justify-between px-12">
        <div className="w-full lap:w-3/5 flex flex-col gap-4">
        <Skeleton height={420} width={450} />
        <div className="flex gap-4">
            {[...Array(4)].map((_, i) => (
            <Skeleton key={i} height={100} width={100} />
            ))}
        </div>
        </div>
        <div className="w-full lap:w-2/5 space-y-2">
        <Skeleton height={30} width={200} />
        <div className=" flex justify-between w-full border-b border-gray-300 pb-3">
            <Skeleton height={22} width={200} />
            <Skeleton height={22} width={150} />
            </div>

        <div className="border-b border-gray-300 pb-3">            
        <Skeleton height={22} width={150} className="mt-2" />
        <Skeleton height={32} width={150} className="mt-4"/>
        <Skeleton height={32} width={150} className="mt-4"/>
                </div>

        <div className="border-b border-gray-300 pb-3">            
        <Skeleton height={22} width={100} className="my-4"/>
        <Skeleton height={32} width={460} className="my-2"/>
        </div>
        </div>
    </div>
    );
}

export default SingleLoader;