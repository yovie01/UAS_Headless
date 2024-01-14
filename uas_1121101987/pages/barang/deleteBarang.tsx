import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

interface ShowModalProps {
  isOpen: boolean;
  closeModal: () => void;
  idBarang: number;
  onDelete: () => void;
}

interface Barang {
  id: number;
  attributes: {
    NamaBarang: string;
    JenisBarang: string;
    StokBarang: number;
    HargaBarang: number;
    Supplayer: string;
  };
}

const customModal = {
  content: {
    width: "30%",
    height: "30%",
    margin: "15% auto auto",
    borderRadius: "1.5rem",
  },
};

const DeleteBarangModal: React.FC<ShowModalProps> = ({
  isOpen,
  closeModal,
  idBarang,
  onDelete,
}) => {
  const [data, setData] = useState<Barang | null>(null);

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/api/barangs/${idBarang}`
        );
        const dataBarang = response.data.data as Barang;
        setData(dataBarang);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    if (isOpen) {
      fecthData();
    }
  }, [isOpen, idBarang]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:1337/api/barangs/${idBarang}`);
      onDelete();
      closeModal();
    } catch (error) {
      console.error("Error deleting Barang:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Barang"
      style={customModal}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg text-teal-500 py-2">
          Apakah Anda Yakin Akan Menghapus
          <span className="text-red-700"> {data?.attributes.NamaBarang} ?</span>
        </h3>
        <div className="modal-action">
          <button
            type="button"
            className="btn-yellow text-xl text-teal-500 py-2"
            onClick={closeModal}
          >
            Cencel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="btn btn-red text-xl text-teal-500 py-2"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteBarangModal;
