import moment from "moment";
import { atom } from "recoil";

export const FormDataRecoil = atom({
    key: "form_data_recoil", // unique ID
    default: {
        index_form: 0,
        user: "Guntur Madjid",
        no_transaksi: "",
        tanggal: moment(new Date()).format("D-M-Y"),
        kategori_kursus: "",
        siswa: "",
        kd_siswa: "",
        nik_siswa: "",
        nama_siswa: "",
        alamat_siswa: "",
        telp_siswa: "",
        kantor_cabang_id: "",
        paket: [
            {
                nama_instruktur: "",
                kd_instruktur: "",
                kd_paket: "",
                nama_paket: "",
                jumlah_pertemuan: "",
                jumlah_materi: "",
                harga: "",
                diskont: "",
                total_harga: "",
            },
        ],
        bayar: "",
        kembali: "",
        total_pertemuan: "",
        total_harga: "",
        total_materi: "",
        total_netto: "",
        total_discount: "",
    }, // default value
});
