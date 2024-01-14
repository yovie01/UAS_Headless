import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

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

const EditBarangPage = () => {
  const [formData, setFormData] = useState({
    NamaBarang: "",
    JenisBarang: "",
    StokBarang: 0,
    HargaBarang: 0,
    Supplayer: "",
  });

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/api/barangs/${id}`
        );
        const dataBarang = response.data.data as Barang;
        setFormData({
          NamaBarang: dataBarang.attributes.NamaBarang,
          JenisBarang: dataBarang.attributes.JenisBarang,
          StokBarang: dataBarang.attributes.StokBarang,
          HargaBarang: dataBarang.attributes.HargaBarang,
          Supplayer: dataBarang.attributes.Supplayer,
        });
      } catch (error) {
        console.error("Error fetching Barang:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

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
      await axios.put(`http://localhost:1337/api/barangs/${id}`, {
        data: formData,
      });
      router.push("./barang");
    } catch (error) {
      console.error("Error updating Barang:", error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl text-teal-500 py-2">Edit Mahasiswa</h2>
      <form onSubmit={handleSubmit}>
        <label className="text-xl text-teal-500 py-2">
          Nama Barang:
          <input
            type="text"
            name="NamaBarang"
            // value={editedData.attributes?.HargaBarang || ''}
            value={formData.NamaBarang || ""}
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
            value={formData.JenisBarang || ""}
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
            value={formData.StokBarang || 0}
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
            value={formData.HargaBarang || 0}
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
            value={formData?.Supplayer || ""}
            onChange={handleChange}
            className="border-2 border-teal-500"
          />
        </label>
        <br />
        {/* <button
            onClick={closeModal}
            className="btn btn-red text-xl text-teal-500 py-2"
          >
            Tutup
          </button> */}
        <button
          type="submit"
          className="btn btn-blue text-xl text-teal-500 py-2"
        >
          Tambah
        </button>
      </form>
    </div>
  );
};

export default EditBarangPage;
