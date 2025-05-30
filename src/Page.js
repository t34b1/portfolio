import { useEffect, React } from 'react';

function Home() {

}



function Page({currentPage, setCurrentPage}) {
    useEffect(() =>  setCurrentPage(currentPage), [currentPage, setCurrentPage])
    console.log(currentPage);
    return (
        <>
        <div className="page">hey there
        </div>
        </>
      );
}

export default Page;