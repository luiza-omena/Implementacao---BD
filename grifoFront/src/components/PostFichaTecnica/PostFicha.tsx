import { useContext, useState } from 'react';
import { HomeContext } from '../../context/HomeContext';
import { CloseOutlined } from '@ant-design/icons';
import { FichaTecnica } from '../../types/FichaTecnica';
import { Api } from '../../hooks/useApi';
import { useParams } from 'react-router-dom';


const PostFicha = () => {
    const { setPostFichaModal } = useContext(HomeContext)
    const  obraId  = useParams();
    const [formData, setFormData] = useState({
        cod_ficha: '',
        data_inicio_obra: '',
        data_termino_obra: '',
        analise: '',
        empresa_prestadora_de_servico: '',
        descricao: '',
        tecnica_restauracao: '',
    });
    
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function onFinish(values: FichaTecnica[], id: number | null) {
        try{
            await Api.post("insert-ficha", {values, id});
            setTimeout(function() {
                location.reload();
              }, 100);
        } catch(error){
            console.log(error)
        }
    }
    
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const ficha: FichaTecnica = {
            cod_ficha: Number(formData.cod_ficha),
            data_inicio_obra: new Date(formData.data_inicio_obra),
            data_termino_obra: new Date(formData.data_termino_obra),
            analise: formData.analise,
            empresa_prestadora_de_servico: formData.empresa_prestadora_de_servico,
            descricao: formData.descricao,
            tecnica_restauracao: formData.tecnica_restauracao,
        };

        onFinish([ficha], Number(obraId['id']))
        // Limpar o formulário após o envio, se necessário
        setFormData({
            cod_ficha: '',
            data_inicio_obra: '',
            data_termino_obra: '',
            analise: '',
            empresa_prestadora_de_servico: '',
            descricao: '',
            tecnica_restauracao: '',
        });
        setPostFichaModal(false)
    };
    
    return (
        <>  
            <div className='w-[700px] h-[550px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed z-[3] bg-white font-Helvetica rounded-[14px] border-grey3'>
            <CloseOutlined style={{marginLeft: "650px", fontSize:"20px", color:"#DAA520"}} onClick={() => setPostFichaModal(false)}/>
            <h2 className='text-[#DAA520] text-4xl font-Inter font-semibold ml-4 cursor-default'>Adicionar Ficha Técnica</h2>
            <div className=''>
                <form onSubmit={handleSubmit}>
                    <div className='mx-8 mt-10 cursor-default'>
                        <label className='text-grey5 font-semibold text-lg font-Inter'>
                        Análise:
                        <input
                            style={{ marginLeft: '10px', border: '2px solid #ccc', borderRadius:'10px' }}
                            type="text"
                            name="analise"
                            value={formData.analise}
                            onChange={handleChange}
                            required
                        />
                        </label>
                        <br />
                    </div>

                    <div className='mx-4 mt-10 cursor-default'>
                        <label className='text-grey5 font-semibold text-lg font-Inter mx-4 cursor-default'>
                        Data de início da restauração:
                        <input
                            style={{ marginLeft: '10px', border: '2px solid #ccc', borderRadius:'10px' }}
                            type="text"
                            name="data_inicio_obra"
                            value={formData.data_inicio_obra}
                            onChange={handleChange}
                            required
                        />
                        </label>
                        <br />
                    </div>

                    <div className='mx-4 mt-10 cursor-default'>
                        <label className='text-grey5 font-semibold text-lg font-Inter mx-4 cursor-default'>
                        Data de finalização da restauração:
                        <input
                            style={{ marginLeft: '10px', border: '2px solid #ccc', borderRadius:'10px' }}
                            type="text"
                            name="data_termino_obra"
                            value={formData.data_termino_obra}
                            onChange={handleChange}
                            required
                        />
                        </label>
                        <br />
                    </div>

                    <div className='mx-4 mt-10 cursor-default'>
                        <label className='text-grey5 font-semibold text-lg font-Inter mx-4 cursor-default'>
                        Descrição:
                        <input
                            style={{ marginLeft: '10px', border: '2px solid #ccc', borderRadius:'10px' }}
                            type="text"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            title="Formato inválido. Use 'x' para separar largura e altura."
                            required
                        />
                        </label>
                        <br />
                    </div>
            
                    <div className='mx-4 mt-10 cursor-default'>
                        <label className='text-grey5 font-semibold text-lg font-Inter mx-4 cursor-default'>
                        Empresas Prestadoras de serviços:
                        <input
                            style={{ marginLeft: '10px', border: '2px solid #ccc', borderRadius:'10px' }}
                            type="text"
                            name="empresa_prestadora_de_servico"
                            value={formData.empresa_prestadora_de_servico}
                            onChange={handleChange}
                        />
                        </label>
                        <br />
                    </div>
                    <div className='mx-4 mt-10 cursor-default'>
                        <label className='text-grey5 font-semibold text-lg font-Inter mx-4 cursor-default'>
                        Técnica de Restauração:
                        <input
                            style={{ marginLeft: '10px', border: '2px solid #ccc', borderRadius:'10px' }}
                            type="text"
                            name="tecnica_restauracao"
                            value={formData.tecnica_restauracao}
                            onChange={handleChange}
                        />
                        </label>
                        <br />
                    </div>
                    <div className='w-32 rounded-full border-2 border-[#DAA520] text-[#DAA520] flex justify-center font-semibold text-xl font-Inter mt-4 ml-[43%]'>
                        <button type="submit">Enviar</button>
                    </div>
                </form>
                </div>
            </div>
            <div onClick={() => setPostFichaModal(false)} className="fixed bg-[#000000] opacity-70 z-[2] top-0 left-0 right-0 bottom-0"></div>
        </>
    );
    };

export default PostFicha;