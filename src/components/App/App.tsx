import React, { useState, useRef, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import fetch from "../../Fetch/fetch";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ImageModal from "../ImageModal/ImageModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface ImageData {
  id: number;
  urls: {
    small: string;
    regular: string;
    alt_description: string;
  };
  description?: string;
  user: {
    username: string;
  };
}

interface ModalData {
  id: number;
  urls: {
    regular: string;
  };
  alt_description: string;
  description?: string;
  user: {
    username: string;
  };
}

const App: React.FC = () => {
  const [imgs, setImgs] = useState<ImageData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [keyWord, setKeyWord] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [dataModal, setDataModal] = useState<ModalData | null>(null);
  const imgRef = useRef<HTMLUListElement | null>(null);

  const submitHandler = (value: string) => {
    setKeyWord(value);
    setPage(1);
    setImgs([]);
  };

  const clickHandler = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const onFetch = async () => {
      if (keyWord) {
        try {
          setLoader(true);
          const data = await fetch(keyWord, page);
          setError(false);
          setLoader(false);
          if (page > 1) {
            setTimeout(() => {
              scroll();
            }, 100);
          }
          setImgs((prevImgs) => [...prevImgs, ...data.results]);
          setTotalPages(data.total_pages);
        } catch (error) {
          setLoader(false);
          setError(true);
        }
      }
    };
    onFetch();
  }, [keyWord, page]);

  const openModal = (data: ModalData): void => {
    setIsOpen(true);
    setDataModal(data);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const scroll = () => {
    if (imgRef.current?.childNodes?.[0]) {
      window.scrollBy({
        top:
          (imgRef.current.childNodes[0] as HTMLElement).getBoundingClientRect()
            .height * 2,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <SearchBar onFind={submitHandler} />
      {modalIsOpen && dataModal && (
        <ImageModal
          info={dataModal}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        />
      )}
      {error && <ErrorMessage />}
      <ImageGallery data={imgs} openModal={openModal} ref={imgRef} />
      {loader && <Loader />}
      {totalPages > page && <LoadMoreBtn onLoadMore={clickHandler} />}
    </>
  );
};

export default App;
