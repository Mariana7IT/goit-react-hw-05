import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import ImageGallery from "../components/ImageGallery/ImageGallery";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../components/ImageModal/ImageModal";
import { fetchImages } from "../services/api";
import toast, { Toaster } from "react-hot-toast";


const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      setIsLoading(true);
      try {
        const data = await fetchImages(query, page);
        setImages((prevImages) => [...prevImages, ...data.results]);
        setTotalImages(data.total);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setTotalImages(0);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <div>
        <SearchBar onSubmit={handleSearch} />
        {error && <ErrorMessage message={error.message} />}
        <ImageGallery images={images} onImageClick={openModal} />
        {images.length > 0 && !isLoading && totalImages > images.length && (
          <LoadMoreBtn onClick={loadMore} />
        )}
        {isLoading && <Loader onClick={loadMore} isLoading={isLoading} />}
        {showModal && <ImageModal image={selectedImage} onClose={closeModal} />}
        <Toaster />
      </div>
    </div>
  );
};


 export default App;