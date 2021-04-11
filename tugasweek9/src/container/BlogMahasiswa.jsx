import React, {Component} from 'react';
import './BlogMahasiswa.css';
import Post from './Post';
import API from '../Services/index';

class BlogMahasiswa extends Component{
    state={
        listMahasiswa:[],
        insertMahasiswa:{
            userId:1,
            id:1,
            nim:"",
            nama:"",
            alamat:"",
            hp:"",
            angkatan:"",
            status:""
        }
    }

    //FETCHING DENGAN URL
    ambilDataDariServerApiMahasiswaBlog = () => {
        API.getNewsBlog().then(result =>{
            this.setState({
                listMahasiswa: result
            })
        })
    }

    componentDidMount(){
        this.ambilDataDariServerApiMahasiswaBlog()
    }

    //arrow function CREATE
    handleTambahMahasiswa = (event) =>{
        let forminsertMahasiswa = {...this.state.insertMahasiswa};
        let timestamp = new Date().getTime();
        forminsertMahasiswa['id'] = timestamp;
        forminsertMahasiswa[event.target.name] = event.target.value;
        this.setState({
            insertMahasiswa : forminsertMahasiswa
        });
    }

    //arrow function SAVE
    handleTombolSimpan = () =>{
        API.postNewsBlog(this.state.insertMahasiswa)
        .then((response) => {
            this.ambilDataDariServerApiMahasiswaBlog();
        })
    }

    //arrow function DELETE
    handleHapusMahasiswa = (data) =>{
        API.deleteNewsBlog(data)
        .then((response) => {
            this.ambilDataDariServerApiMahasiswaBlog();
        })
    }

    render(){
        return(
            <div className="post-mahasiswa">
            <div className="from pb-2 border bottom">
                <br></br>
                <div className="from-group row">
                    <label htmlFor="nim" className="col-sm-2 col-form-label">NIM</label>
                    <div className="col-sm-5">
                        <input type="text" className="form-control" id="nim" name="nim" onChange={this.handleTambahMahasiswa}/>
                    </div>
                </div>

                <div className="from-group row">
                    <label htmlFor="nama" className="col-sm-2 col-form-label">Nama Mahasiswa</label>
                    <div className="col-sm-5">
                    <input type="text" className="form-control" id="nama" name="nama" onChange={this.handleTambahMahasiswa}/>
                    </div>
                </div>
                
                <div className="from-group row">
                    <label htmlFor="alamat" className="col-sm-2 col-form-label">Alamat</label>
                    <div className="col-sm-5">
                    <input type="text" className="form-control" id="alamat" name="alamat" onChange={this.handleTambahMahasiswa}/>
                    </div>
                </div>
                
                <div className="from-group row">
                    <label htmlFor="hp" className="col-sm-2 col-form-label">Hp</label>
                    <div className="col-sm-5">
                    <input type="text" className="form-control" id="hp" name="hp" onChange={this.handleTambahMahasiswa}/>
                    </div>
                </div>

                <div className="from-group row">
                    <label htmlFor="angkatan" className="col-sm-2 col-form-label">Angkatan</label>
                    <div className="col-sm-5">
                    <input type="text" className="form-control" id="angkatan" name="angkatan" onChange={this.handleTambahMahasiswa}/>
                    </div>
                </div>
                
                <div className="from-group row">
                    <label htmlFor="status" className="col-sm-2 col-form-label">Status</label>
                    <div className="col-sm-5">
                    <input type="text" className="form-control" id="status" name="status" onChange={this.handleTambahMahasiswa}/>
                    </div>
                </div>
                
                 <button type="submit" className="btn btn-primary" onClick={this.handleTombolSimpan}>Simpan</button>

            </div>
            <h2>Daftar Mahasiswa</h2>
           {
               this.state.listMahasiswa.map(mahasiswa =>{
                   return <Post key={mahasiswa.id} 
                   nim={mahasiswa.nim} 
                   nama={mahasiswa.nama}
                   alamat={mahasiswa.alamat}
                   hp={mahasiswa.hp}
                   angkatan={mahasiswa.angkatan}
                   status={mahasiswa.status}     
                   idMahasiswa={mahasiswa.id} 
                   hapusMahasiswa={this.handleHapusMahasiswa}/>
               })
           } 
            
        </div>
        )
    }
}

export default BlogMahasiswa;