import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";

interface ModalContentProps {
  isOpen: boolean;
  closeModal: () => void;
}

const customModal = {
  content: {
    width: "50%",
    height: "60%",
    margin: "5% auto auto",
    borderRadius: "2rem",
  },
};

const CreateBarangModal: React.FC<ModalContentProps> = ({
  isOpen,
  closeModal,
}) => {
  const [formData, setFormData] = useState({
    NamaBarang: "",
    JenisBarang: "",
    StokBarang: 0,
    HargaBarang: 0,
    Supplayer: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const createData = await axios.post("http://localhost:1337/api/barangs", {
        data: formData,
      });
      console.log("Data Baru Telah Ditambahkan", createData);
      closeModal();
    } catch (error) {
      console.error("Error Create Barang:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Tambah Barang"
      style={customModal}
    >
      <div>
        <h2 className="text-3xl text-teal-500 py-2">Tambah Barang</h2>
        <form onSubmit={handleSubmit}>
          <label className="text-xl text-teal-500 py-2">
            Nama Barang:
            <input
              type="text"
              name="NamaBarang"
              value={formData.NamaBarang}
              onChange={handleChange}
              className="border-2 border-teal-500"
            />
          </label>
          <br />
          <label className="text-xl text-teal-500 py-2">
            Jenis Barang:
            <input
              type="text"
              name="JenisBarang"
              value={formData.JenisBarang}
              onChange={handleChange}
              className="border-2 border-teal-500"
            />
          </label>
          <br />
          <label className="text-xl text-teal-500 py-2">
            Stok Barang:
            <input
              type="number"
              name="StokBarang"
              value={formData.StokBarang}
              onChange={handleChange}
              className="border-2 border-teal-500"
            />
          </label>
          <br />
          <label className="text-xl text-teal-500 py-2">
            Harga Barang:
            <input
              type="number"
              name="HargaBarang"
              value={formData.HargaBarang}
              onChange={handleChange}
              className="border-2 border-teal-500"
            />
          </label>
          <br />
          <label className="text-xl text-teal-500 py-2">
            Supplayer:
            <input
              type="text"
              name="Supplayer"
              value={formData.Supplayer}
              onChange={handleChange}
              className="border-2 border-teal-500"
            />
          </label>
          <br />
          <button
            onClick={closeModal}
            className="btn btn-red text-xl text-teal-500 py-2"
          >
            Tutup
          </button>
          <button
            type="submit"
            className="btn btn-blue text-xl text-teal-500 py-2"
          >
            Tambah
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateBarangModal;
