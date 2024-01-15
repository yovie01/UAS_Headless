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
        <h2 className="modal-title">Tambah Barang</h2>
        <form onSubmit={handleSubmit}>
          <label className="form-label">
            Nama Barang:
            <input
              type="text"
              name="NamaBarang"
              value={formData.NamaBarang}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <br />
          <label className="form-label">
            Jenis Barang:
            <input
              type="text"
              name="JenisBarang"
              value={formData.JenisBarang}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <br />
          <label className="form-label">
            Stok Barang:
            <input
              type="number"
              name="StokBarang"
              value={formData.StokBarang}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <br />
          <label className="form-label">
            Harga Barang:
            <input
              type="number"
              name="HargaBarang"
              value={formData.HargaBarang}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <br />
          <label className="form-label">
            Supplayer:
            <input
              type="text"
              name="Supplayer"
              value={formData.Supplayer}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <br />
          <button onClick={closeModal} className="btn btn-red">
            Tutup
          </button>
          <button type="submit" className="btn btn-blue">
            Tambah
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateBarangModal;
