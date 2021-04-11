import React from "react";
import './Post.css';

const Post = (props) => {
    return(
        <div className = "artikel">
            <div className="gambar-artikel">
                <img src="http://placeimg.com/80/80/tech" alt="Gambar Tumbnail Artikel"/>
            </div>
            <div className="konten-artikel">
                <div className="nim-mahasiswa">Nim : {props.nim}</div>
                <p className = "nama-mahasiswa">Nama: {props.nama}</p>
                <p className ="alamat-mahasiswa">Alamat :{props.alamat}</p>
                <p className ="hp-mahasiswa">HP :{props.hp}</p>
                <p className ="angkatan-mahasiswa">Angkatan :{props.angkatan}</p>
                <p className ="status-mahasiswa">Status : {props.status}</p>
                <button className="btn-warning" onClick={()=>props.hapusMahasiswa(props.idMahasiswa)}>Hapus</button>
                <hr></hr>
            </div>
        </div>
    )
}

export default Post;