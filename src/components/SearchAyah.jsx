import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import logo from '../assets/images/new.png';
import { useGetSurahQuery } from '../redux/features/api/apiSlice';
import { useArabicAyahQuery } from '../redux/features/ayah/ayahSlice';
import { Close, Search2 } from './Icons';

const SearchAyah = ({ props }) => {
    const dispatch = useDispatch();
    const { showModal, setShowModal } = props;
    const { data: surahs, isLoading, isError } = useGetSurahQuery();
    const [selectedSurah, setSelectedSurah] = useState(1)
    const [numberofayahs, setNumberofayahs] = useState(7)
    const [selectedAyah, setSelectedAyah] = useState(1)
    const [skip, setSkip] = useState(true)
    const { data: ayah, isLoading: ayahLoading, isError: ayahError, isSuccess } = useArabicAyahQuery({ surah: selectedSurah, ayah: selectedAyah }, { skip: skip })


    useEffect(() => {
        if (surahs?.data.length > 0) {
            setNumberofayahs(surahs.data.find(s => s.number == selectedSurah).numberOfAyahs)
        }
    }, [selectedSurah])


    // decide what to print on the ui
    let content = null;
    if (isLoading) content = <div>Loading...</div>
    if (isError) content = <div>Something went wrong</div>
    if (!isLoading && !isError && surahs.data.length) content = <select
        onChange={e => {
            setSelectedSurah(e.target.value)
        }}
        className="w-full rounded border bg-white bg-opacity-10 appearance-none border-gray-300 py-2  text-base pl-3 pr-10">
        {surahs.data.map(surah => {
            return <option
                value={surah.number}
                key={surah.number}
            > {surah.englishName}  - {surah.name}</option>
        })}
    </select>


    // handle submit 
    const handleSubmit = (e) => {
        e.preventDefault();
        // setShowModal(false)
        setSkip(false)
        if (isSuccess) {
            console.log(ayah.data.text)
        }
        /// search surah and ayah from api

    }

    return (
        <div className={`fixed ${showModal ? "transition-all duration-300 block" : "hidden"} transition-all duration-300 inset-0 overflow-y-auto flex items-center justify-center  `} >
            <div className=" relative bg-white bg-opacity-70 backdrop-blur rounded-lg text-left  shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-4 lg:p8" >
                <div onClick={() => setShowModal(false)} className="absolute cursor-pointer -top-10 right-0 bg-red-500 hover:bg-red-600 bg-opacity-50 text-white p-1 rounded ">
                    <Close className="w-5 h-5 " />
                </div>
                {/* modal body */}
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="border-b pb-2">
                        <h3 className="text-lg leading-6 font-medium text-gray-700 flex items-center gap-2 ">
                            <img
                                className="h-8 w-8 rounded-full"
                                src={logo}
                                alt="logo"
                            />  Search for an Ayah
                        </h3>
                    </div>
                    <div className="mt-2">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2 focus:outline-none" htmlFor="surah-number">
                                    Surah Number
                                </label>
                                {content}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ayah-number">
                                    Ayah Number
                                </label>

                                <select onChange={e => setSelectedAyah(e.target.value)} className="w-full rounded border bg-white bg-opacity-10 appearance-none border-gray-300 py-2  text-base pl-3 pr-10">

                                    {[...Array((numberofayahs + 1)).keys()].slice(1).map(ayah => {
                                        return <option key={ayah}> {ayah} </option>
                                    })}
                                </select>
                            </div>
                            <div className="mb-4 w-full">
                                <button className='w-full rounded bg-indigo-500 hover:bg-indigo-600 text-white py-3 flex items-center justify-center gap-2'> <Search2 />  Search </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default SearchAyah