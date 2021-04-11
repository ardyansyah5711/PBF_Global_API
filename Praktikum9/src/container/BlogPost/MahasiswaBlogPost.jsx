import React, {Component} from 'react';
import './MahasiswaBlogPost.css';
import MahasiswaPost from '../BlogPost/MahasiswaPost'

class MahasiswaBlogPost extends Component{
    state = {
        listMahasiswa: [],
        insertMahasiswa: {
            id: "1",
            nama: "",
            nim: "",
            alamat: "",
            hp: "",
            angkatan: "",
            status: ""
        },
    };

    ambilDataDariServerAPI = () =>{
        fetch('http://localhost:3005/mahasiswa')
        .then(response => response.json())
        .then(jsonHasilAmbilDariAPI => {
            this.setState({
                listMahasiswa: jsonHasilAmbilDariAPI
            })
        })
    }

    componentDidMount(){
        this.ambilDataDariServerAPI()
    }

    handleHapusMahasiswa = (data) => {
        fetch(`http://localhost:3005/mahasiswa/${data}`, {method: 'DELETE'})
            .then(res => {
                this.ambilDataDariServerAPI()
            })
    }

    handleTambahMahasiswa = (event) => {
                let formInsertMahasiswa = {...this.state.insertMahasiswa};
                let timeStamp = new Date().getTime();
                formInsertMahasiswa['id'] = timeStamp;
                formInsertMahasiswa[event.target.name] = event.target.value;
                this.setState({
                    insertMahasiswa: formInsertMahasiswa
                });
            }

            handleTombolSimpan = () => {
                fetch('http://localhost:3005/mahasiswa', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.state.insertMahasiswa)
                })
                    .then((Response) => {
                        this.ambilDataDariServerAPI();
                });
            }

    render(){
        return(
            <div className="post-mahasiswa">
                <div className="form pb-2 border-bottom">
                    <div className="form-group row">
                        <label htmlFor="nama" className="col-sm-2 col-form-label">Nama</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="nama" id="nama" onChange={this.handleTambahMahasiswa}/>
                        </div>
                    </div>
                <div className="form-group row">
                    <label htmlFor="nim" className="col-sm-2 col-form-label">Nim</label>
                    <div className="col-sm-10">
                        <input className="form-control" type="number" id="nim" name="nim" onChange={this.handleTambahMahasiswa}></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="alamat" className="col-sm-2 col-form-label">alamat</label>
                    <div className="col-sm-10">
                        <textarea className="form-control" id="alamat" name="alamat" onChange={this.handleTambahMahasiswa}></textarea>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="hp" className="col-sm-2 col-form-label">hp</label>
                    <div className="col-sm-10">
                        <input className="form-control" type="number" id="hp" name="hp" onChange={this.handleTambahMahasiswa}></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="angkatan" className="col-sm-2 col-form-label">Angkatan</label>
                    <div className="col-sm-10">
                        <input className="form-control" id="angkatan" type="number" name="angkatan" onChange={this.handleTambahMahasiswa}></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="status" className="col-sm-2 col-form-label">Status</label>
                    <div className="col-sm-10">
                        <textarea className="form-control"  id="status" name="status" onChange={this.handleTambahMahasiswa}></textarea>
                    </div>
                </div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleTombolSimpan}>Simpan</button>
                </div>
                <h2>Daftar Mahasiswa</h2>
                {
                    this.state.listMahasiswa.map(mahasiswa=> {
                        return <MahasiswaPost 
                        key={mahasiswa.id} 
                        nama={mahasiswa.nama}
                        nim={mahasiswa.nim}
                        alamat={mahasiswa.alamat}
                        hp={mahasiswa.hp}
                        angkatan={mahasiswa.angkatan}
                        status={mahasiswa.status} idMahasiswa={mahasiswa.id}
                        hapusMahasiswa={this.handleHapusMahasiswa}/>
                    })
                }
            
            </div>
            
        )
    }
}

export default MahasiswaBlogPost;