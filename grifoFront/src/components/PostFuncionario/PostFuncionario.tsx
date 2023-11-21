import { useContext, useState } from 'react';
import { HomeContext } from '../../context/HomeContext';
import { CloseOutlined } from '@ant-design/icons';
import { Api } from '../../hooks/useApi';
import { Funcionario } from '../../types/Funcionario';


const FuncionarioModal = () => {
    const { setFuncionarioModal } = useContext(HomeContext)
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        estado: '',
        rua: '',
        bairro: '',
        cidade: '',
        numero: '',
        salario: '',
    });
    
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function onFinish(values: Funcionario[]) {
        try{
            await Api.post("insert-funcionario", {values});
            setTimeout(function() {
                location.reload();
              }, 100);
        } catch(error){
            console.log(error)
        }
    }
    
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const funcionario: Funcionario = {
            nome: formData.nome,
            email: formData.email,
            estado: formData.estado,
            rua: formData.rua,
            bairro: formData.bairro,
            cidade: formData.cidade,
            numero: Number(formData.numero),
            salario: Number(formData.salario),
            id_funcionario: null
        };

        onFinish([funcionario])
        // Limpar o formulário após o envio, se necessário
        setFormData({
            nome: '',
            email: '',
            estado: '',
            rua: '',
            bairro: '',
            cidade: '',
            numero: '',
            salario: '',
        });
        setFuncionarioModal(false)
    };
    
    return (
        <>  
            <div className='w-[700px] h-[550px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed z-[3] bg-white font-Helvetica rounded-[14px] border-grey3'>
            <CloseOutlined style={{marginLeft: "650px", fontSize:"20px", color:"#DAA520"}} onClick={() => setFuncionarioModal(false)}/>
            <h2 className='text-[#DAA520] text-4xl font-Inter font-semibold ml-4 cursor-default'>Adicionar Funcionário</h2>
            <div className=''>
                <form onSubmit={handleSubmit}>
                <div className='mx-8 mt-4 cursor-default'>
                    <label className='text-grey5 font-semibold text-lg font-Inter'>
                        Nome:
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

                <div className='mx-8 mt-4 cursor-default'>
                    <label className='text-grey5 font-semibold text-lg font-Inter'>
                        Email:
                        <input
                            style={{ marginLeft: '10px', border: '2px solid #ccc', borderRadius:'10px' }}
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                </div>

                <div className='mx-8 mt-4 cursor-default'>
                    <label className='text-grey5 font-semibold text-lg font-Inter'>
                        Estado:
                        <input
                            style={{ marginLeft: '10px', border: '2px solid #ccc', borderRadius:'10px' }}
                            type="text"
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                </div>

                <div className='mx-8 mt-4 cursor-default'>
                    <label className='text-grey5 font-semibold text-lg font-Inter'>
                        Rua:
                        <input
                            style={{ marginLeft: '10px', border: '2px solid #ccc', borderRadius:'10px' }}
                            type="text"
                            name="rua"
                            value={formData.rua}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                </div>

                <div className='mx-8 mt-4 cursor-default'>
                    <label className='text-grey5 font-semibold text-lg font-Inter'>
                        Bairro:
                        <input
                            style={{ marginLeft: '10px', border: '2px solid #ccc', borderRadius:'10px' }}
                            type="text"
                            name="bairro"
                            value={formData.bairro}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                </div>

                <div className='mx-8 mt-4 cursor-default'>
                    <label className='text-grey5 font-semibold text-lg font-Inter'>
                        Cidade:
                        <input
                            style={{ marginLeft: '10px', border: '2px solid #ccc', borderRadius:'10px' }}
                            type="text"
                            name="cidade"
                            value={formData.cidade}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                </div>

                <div className='mx-8 mt-4 cursor-default'>
                    <label className='text-grey5 font-semibold text-lg font-Inter'>
                        Número:
                        <input
                            style={{ marginLeft: '10px', border: '2px solid #ccc', borderRadius:'10px' }}
                            type="text"
                            name="numero"
                            value={formData.numero}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                </div>

                <div className='mx-8 mt-4 cursor-default'>
                    <label className='text-grey5 font-semibold text-lg font-Inter'>
                        Salário:
                        <input
                            style={{ marginLeft: '10px', border: '2px solid #ccc', borderRadius:'10px' }}
                            type="text"
                            name="salario"
                            value={formData.salario}
                            onChange={handleChange}
                            required
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
            <div onClick={() => setFuncionarioModal(false)} className="fixed bg-[#000000] opacity-70 z-[2] top-0 left-0 right-0 bottom-0"></div>
        </>
    );
    };

export default FuncionarioModal;