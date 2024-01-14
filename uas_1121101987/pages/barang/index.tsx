"use client";
import { useState, useEffect } from "react";
import axios from "axios";

// Import Modal
import CreateBarangModal from "./addBarang";
import ShowBarangModal from "./showBarang";
import EditBarangModal from "./editBarang";
import DeleteBarangModal from "./deleteBarang";

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

export async function getBarang(): Promise<Barang[]> {
  try {
    const response = await axios.get("http://localhost:1337/api/barangs");
    return response.data.data as Barang[];
  } catch (error) {
    throw new Error("Gagal Mendapatkan Data");
  }
}

export default function Page() {
  const [data, setData] = useState<Barang[]>([]);
  const [selectedBarang, setSelectedBarang] = useState<number | null>(null);

  const [modalCreateOpen, setmodalCreateOpen] = useState(false);
  const [modalDetailOpen, setModalDetailOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  useEffect(() => {
    async function fecthData() {
      try {
        const dataBarang = await getBarang();
        setData(dataBarang || []);
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    fecthData();
  }, []);

  const handleCreate = () => {
    setmodalCreateOpen(true);
  };

  const handleShow = (id: number) => {
    setSelectedBarang(id);
    setModalDetailOpen(true);
  };

  const handleEdit = (id: number) => {
    setSelectedBarang(id);
    setModalEditOpen(true);
  };

  const handleDelete = (id: number) => {
    setSelectedBarang(id);
    setModalDeleteOpen(true);
  };

  const modalCreateClose = async () => {
    setSelectedBarang(null);
    setmodalCreateOpen(false);
    const updatedData = await getBarang();
    setData(updatedData || []);
  };

  const modalDetailClose = () => {
    setSelectedBarang(null);
    setModalDetailOpen(false);
  };

  const modalEditClose = async () => {
    setSelectedBarang(null);
    setModalEditOpen(false);
    const updatedData = await getBarang();
    setData(updatedData || []);
  };

  const closeModalDelete = async () => {
    setSelectedBarang(null);
    setModalDeleteOpen(false);
    const updatedData = await getBarang();
    setData(updatedData || []);
  };

  const modalDelete = () => {
    console.log(`Data with ID ${selectedBarang} has deleted`);
    closeModalDelete();
  };

  return (
    <div className="container p-3">
      <div className="container flex-col my-4">
        <h1 className="text-5xl text-teal-500 pb-2">Daftar Barang</h1>
        <button className="btn btn-primary" onClick={() => handleCreate()}>
          Tambah Data Barang
        </button>
      </div>

      <div className="container">
        <table className="table table-auto border-collapse border border-slate-200 w-2/3">
          <thead>
            <tr>
              <th className="border border-slate-600 p-2">Nama Barang</th>
              <th className="border border-slate-600 p-2">Jenis Barang</th>
              <th className="border border-slate-600 p-2"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((barang) => (
              <tr key={barang.id}>
                <td className="border border-slate-700 p-2">
                  {barang.attributes.NamaBarang}
                </td>
                <td className="border border-slate-700 p-2">
                  {barang.attributes.JenisBarang}
                </td>
                <td className="flex justify-around border border-slate-700 p-2">
                  <button
                    className="btn btn-blue"
                    onClick={() => handleShow(barang.id)}
                  >
                    Detail
                  </button>
                  <button
                    className="btn btn-yellow"
                    onClick={() => handleEdit(barang.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-red"
                    onClick={() => handleDelete(barang.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateBarangModal
        isOpen={modalCreateOpen}
        closeModal={modalCreateClose}
      />

      <ShowBarangModal
        isOpen={modalDetailOpen}
        closeModal={modalDetailClose}
        idBarang={selectedBarang || 0}
      />

      <EditBarangModal
        isOpen={modalEditOpen}
        closeModal={modalEditClose}
        idBarang={selectedBarang || 0}
      />

      <DeleteBarangModal
        isOpen={modalDeleteOpen}
        closeModal={closeModalDelete}
        idBarang={selectedBarang || 0}
        onDelete={modalDelete}
      />
    </div>
  );
}
