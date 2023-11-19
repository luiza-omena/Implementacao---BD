import { useContext, useEffect, useState } from 'react';
import { HomeContext } from '../../context/HomeContext';
import { Obra } from '../../types/Obra';
import { Api } from '../../hooks/useApi';
import { CloseOutlined } from '@ant-design/icons';


const PostObra = () => {
    const { setPostObraModal } = useContext(HomeContext)
    const [formData, setFormData] = useState({
        nome: '',
        artista_original: '',
        movimento_artistico: '',
        dimensoes: '',
        img: '',
        tipoBem: '',
    });
    
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function onFinish(values: Obra[]) {
        try{
            await Api.post("insert-obra", { values });
        } catch(error){
            console.log(error)
        }
    }
    
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const obra: Obra = {
            artista_original: formData.artista_original,
            dimensoes: formData.dimensoes,
            id_obra: null,
            img: formData.img,
            movimento_artistico: formData.movimento_artistico,
            nome: formData.nome,
        };
        onFinish([obra])
        // Limpar o formulário após o envio, se necessário
        setFormData({
        nome: '',
        artista_original: '',
        movimento_artistico: '',
        dimensoes: '',
        img: '',
        tipoBem: '',
        });
    };
    
    return (
        <>  
            <div className='w-[700px] h-[550px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed z-[3] bg-white font-Helvetica rounded-[14px] border-grey3'>
            <CloseOutlined style={{marginLeft: "650px", fontSize:"20px", color:"#DAA520"}} onClick={() => setPostObraModal(false)}/>
            <h2 className='text-[#DAA520] text-4xl font-Inter font-semibold ml-4 mt-2 cursor-default'>Adicionar Obra</h2>
            <div className=''>
                <form onSubmit={handleSubmit}>
                    <div className='mx-8 mt-10 cursor-default'>
                        <label className='text-grey5 font-semibold text-lg font-Inter'>
                        Nome da Obra:
                        <input
                            style={{ marginLeft: '10px', border: '2px solid #ccc', borderRadius:'10px' }}
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                        </label>
                        <br />
                    </div>

                    <div className='mx-4 mt-10 cursor-default'>
                        <label className='text-grey5 font-semibold text-lg font-Inter mx-4 cursor-default'>
                        Artista Original:
                        <input
                            style={{ marginLeft: '10px', border: '2px solid #ccc', borderRadius:'10px' }}
                            type="text"
                            name="artista_original"
                            value={formData.artista_original}
                            onChange={handleChange}
                            required
                        />
                        </label>
                        <br />
                    </div>

                    <div className='mx-4 mt-10 cursor-default'>
                        <label className='text-grey5 font-semibold text-lg font-Inter mx-4 cursor-default'>
                        Movimento Artístico:
                        <input
                            style={{ marginLeft: '10px', border: '2px solid #ccc', borderRadius:'10px' }}
                            type="text"
                            name="movimento_artistico"
                            value={formData.movimento_artistico}
                            onChange={handleChange}
                            required
                        />
                        </label>
                        <br />
                    </div>

                    <div className='mx-4 mt-10 cursor-default'>
                        <label className='text-grey5 font-semibold text-lg font-Inter mx-4 cursor-default'>
                        Dimensões (Formato: Largura x Altura):
                        <input
                            style={{ marginLeft: '10px', border: '2px solid #ccc', borderRadius:'10px' }}
                            type="text"
                            name="dimensoes"
                            value={formData.dimensoes}
                            onChange={handleChange}
                            pattern=".+x.+" // Verifica se há um 'x' no valor
                            title="Formato inválido. Use 'x' para separar largura e altura."
                            required
                        />
                        </label>
                        <br />
                    </div>
            
                    <div className='mx-4 mt-10 cursor-default'>
                        <label className='text-grey5 font-semibold text-lg font-Inter mx-4 cursor-default'>
                        Imagem (URL):
                        <input
                            style={{ marginLeft: '10px', border: '2px solid #ccc', borderRadius:'10px' }}
                            type="text"
                            name="img"
                            value={formData.img}
                            onChange={handleChange}
                        />
                        </label>
                        <br />
                    </div>

                    <div className='mx-4 mt-10 cursor-default'>
                        <label className='text-grey5 font-semibold text-lg font-Inter mx-4 cursor-default'>
                        Tipo de Bem:
                        <select
                            name="tipoBem"
                            value={formData.tipoBem}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione o tipo de bem</option>
                            <option value="Bens_moveis">Bens Móveis</option>
                            <option value="Bens_imoveis">Bens Imóveis</option>
                        </select>
                        </label>
                        <br />
                    </div>
                    <div className='w-32 rounded-full border-2 border-[#DAA520] text-[#DAA520] flex justify-center font-semibold text-xl font-Inter mt-4 ml-[43%]'>
                        <button type="submit">Adicionar</button>
                    </div>
                </form>
                </div>
            </div>
            <div onClick={() => setPostObraModal(false)} className="fixed bg-[#000000] opacity-70 z-[2] top-0 left-0 right-0 bottom-0"></div>
        </>
    );
    };

export default PostObra;