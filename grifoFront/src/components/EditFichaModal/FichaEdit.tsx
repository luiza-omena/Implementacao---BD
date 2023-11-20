import { useContext, useState } from 'react';
import { HomeContext } from '../../context/HomeContext';
import { Api } from '../../hooks/useApi';
import { CloseOutlined } from '@ant-design/icons';


const FichaEdit = (props: {idObra: number | null, campo: string}) => {
    const { setUpdateModal } = useContext(HomeContext)
    const [formData, setFormData] = useState({
        valor: '',
    });
    
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function onFinish(idObra: number | null, campo: string, valor: string) {
        try{
            Response = await Api.put("update-ficha", { idObra, campo, valor });
            console.log(Response)
            setTimeout(function() {
                location.reload();
              }, 100);
              setUpdateModal(false)

        } catch(error){
            console.log(error)
        }
    }
    
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        
        let valor = ''
        if (props.campo === "Descrição") {
            valor = "descricao";
        } else if (props.campo === "Técnica de Restauração") {
            valor = "tecnica_restauracao";
        } else if (props.campo === "Análise") {
            valor = "analise";
        } else if (props.campo === "Data do início da obra") {
            valor = "data_inicio_obra";
        } else if (props.campo === "Data do término da obra") {
            valor = "data_termino_obra";
        } else if (props.campo === "Empresa Prestadora de serviço") {
            valor = "empresa_prestadora_de_servico";
        } else {
            valor = "";
        }
        onFinish(props.idObra, valor, formData.valor)
        // Limpar o formulário após o envio, se necessário
        setFormData({
            valor: '',
        });
    };
    
    return (
        <>  
            <div className='w-[700px] h-[550px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed z-[3] bg-white font-Helvetica rounded-[14px] border-grey3'>
            <CloseOutlined style={{marginLeft: "650px", fontSize:"20px", color:"#DAA520"}} onClick={() => {setUpdateModal(false)}}/>
            <h2 className='text-[#DAA520] text-4xl font-Inter font-semibold ml-4 mt-2 cursor-default'>Atualizar {props.campo}</h2>
            <div className=''>
                <form onSubmit={handleSubmit}>
                    <div className='mx-8 mt-10 cursor-default'>
                        <label className='text-grey5 font-semibold text-lg font-Inter'>
                        {props.campo}:
                        <input
                            style={{ marginLeft: '10px', border: '2px solid #ccc', borderRadius:'10px' }}
                            type="text"
                            name="valor"
                            value={formData.valor}
                            onChange={handleChange}
                            required
                        />
                        </label>
                        <br />
                    </div>

                    <div className='w-32 rounded-full border-2 border-[#DAA520] text-[#DAA520] flex justify-center font-semibold text-xl font-Inter mt-4 ml-[43%]'>
                        <button type="submit">Atualizar</button>
                    </div>
                </form>
                </div>
            </div>
            <div onClick={() => {setUpdateModal(false)}} className="fixed bg-[#000000] opacity-70 z-[2] top-0 left-0 right-0 bottom-0"></div>
        </>
    );
    };

export default FichaEdit;