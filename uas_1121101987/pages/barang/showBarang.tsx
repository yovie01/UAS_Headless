"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { getBarangid } from ".";

interface ShowModalProps {
  isOpen: boolean;
  closeModal: () => void;
  idBarang: number;
}

interface Barang {
  id: number;
  attributes: {
    NamaBarang: string;
    JenisBarang: string;
    StokBarang: number;
    HargaBarang: number;
    Supplayer: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

const customModal = {
  content: {
    width: "50%",
    height: "60%",
    margin: "5% auto auto",
    borderRadius: "2rem",
  },
};

const ShowBarangModal: React.FC<ShowModalProps> = ({
  isOpen,
  closeModal,
  idBarang,
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
        throw new Error("Gagal Mendapatkan Data");
      }
    };
    if (isOpen) {
      fecthData();
    }
  }, [isOpen, idBarang]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Detail Barang"
      style={customModal}
    >
      {data && (
        <div>
          <h2 className="text-3xl text-teal-500 py-2">Detail Barang</h2>
          <p className="text-xl text-teal-500 py-2">
            Nama Barang: {data.attributes.NamaBarang}
          </p>
          <p className="text-xl text-teal-500 py-2">
            Jenis Barang: {data.attributes.JenisBarang}
          </p>
          <p className="text-xl text-teal-500 py-2">
            Stok Barang: {data.attributes.StokBarang}
          </p>
          <p className="text-xl text-teal-500 py-2">
            Harga Barang: {data.attributes.HargaBarang}
          </p>
          <p className="text-xl text-teal-500 py-2">
            Supplayer: {data.attributes.Supplayer}
          </p>
          <button
            className="btn btn-red text-xl text-teal-500 py-2"
            onClick={closeModal}
          >
            Tutup
          </button>
        </div>
      )}
    </Modal>
  );
};

export default ShowBarangModal;
