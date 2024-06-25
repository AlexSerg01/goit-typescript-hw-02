import { useState, useRef, useEffect } from "react";

import SearchBar from "../SearchBar/SearchBar";
import fetch from "../../Fetch/fetch";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ImageModal from "../ImageModal/ImageModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import * as AT from "./App.types";
import { FetchType } from "../../Fetch/fetch.types";

export default function App() {
  const [imgs, setImgs] = useState<AT.Imgs | null>(null);
  const [page, setPage] = useState<number>(1);
  const [keyWord, setKeyWord] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [dataModal, setDataModal] = useState<AT.Img | null>(null);
  // --------------------------------------------
  const imgRef = useRef<HTMLUListElement | null>(null);

  function submitHandler(value: string): void {
    setKeyWord(value);
    setPage(1);
    setImgs([]);
  }

  function clickHandler(): void {
    setPage(page + 1);
  }

  useEffect(() => {
    async function onFetch() {
      if (keyWord) {
        try {
          setLoader(true);
          const data = await fetch<FetchType>(keyWord, page);
          setTotalPages(0);
          setError(false);
          setLoader(false);
          // лишив перевірку для запуску таймауту
          page > 1 &&
            setTimeout(() => {
              scroll();
            }, 100);
          setImgs((prevImgs) => {
            if (prevImgs === null) {
              return [...data.results];
            } else {
              return [...prevImgs, ...data.results];
            }
          });
          setTotalPages(data.total_pages);
        } catch (error) {
          setLoader(false);
          setError(true);
        }
      }
    }
    onFetch();
  }, [keyWord, page]);

  function openModal(data: AT.Img): void {
    setIsOpen(true);
    setDataModal(data);
  }

  function closeModal(): void {
    setIsOpen(false);
    setDataModal(null);
  }

  function scroll(): void {
    const childNode = imgRef.current?.childNodes?.[0] as HTMLElement;
    imgRef.current?.childNodes?.[0] &&
      window.scrollBy({
        top: childNode.getBoundingClientRect().height * 2,
        left: 0,
        behavior: "smooth",
      });
  }

  return (
    <>
      <SearchBar onFind={submitHandler}></SearchBar>
      {modalIsOpen && dataModal && (
        <ImageModal
          info={dataModal}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        ></ImageModal>
      )}
      {error && <ErrorMessage></ErrorMessage>}

      {imgs ? (
        <ImageGallery
          data={imgs}
          openModal={openModal}
          ref={imgRef}
        ></ImageGallery>
      ) : (
        <></>
      )}
      {loader && <Loader></Loader>}
      {totalPages > page && (
        <LoadMoreBtn onLoadMore={clickHandler}></LoadMoreBtn>
      )}
    </>
  );
}
