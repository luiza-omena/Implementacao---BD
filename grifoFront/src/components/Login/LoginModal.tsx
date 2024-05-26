import { HomeContext } from "../../context/HomeContext";
import { useContext, useEffect } from 'react';
import { Col, Form, Input, Row, message } from "antd"
import input from "antd/es/input";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";

const LoginModal = () => {

    const { setOpenUserCredentialsModal } = useContext(HomeContext)
	const auth = useAuth()
	const navigate = useNavigate();

	async function onFinish(values: {email:string, password: string}) {
		try{
			await auth.authenticate(values.email, values.password)
			navigate('/admin');
		} catch(error){
			message.error('Email ou senha inválidos')
		}
	}

	useEffect(() => {
	  }, [])

	return (
		<>	
			<div className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed z-[3] bg-white font-Helvetica rounded-[14px] border-grey3">
				<CloseOutlined style={{marginLeft: "650px", fontSize:"20px", color:"#DAA520", marginTop:"10px", marginRight:"10px"}} onClick={() => setOpenUserCredentialsModal(false)}/>
				<h2 className='text-[#DAA520] text-4xl font-Inter font-semibold ml-4 mt-2 cursor-default'>Login</h2>
				<div className="flex items-center justify-center">
					<Row
					align={"middle"}
					justify={"end"}
						style={{
						height: '300px',
						width: '600px',
						zIndex: '3'
						}}
					>
						<Col span={24}>
							<Form
							name='basic'
							labelCol={{span: 8}}
							wrapperCol={{ span: 20}}
							onFinish={onFinish}
							>
								<Form.Item
								label='email'
								name='email'>
									<Input />
								</Form.Item>

								<Form.Item
								label='password'
								name='password'>
									<input.Password />
								</Form.Item>

								<Form.Item wrapperCol={{ offset: 8, span:20}}>
								<button type="submit" className="w-32 rounded-full border-2 border-[#DAA520] text-[#DAA520] flex justify-center font-semibold hover:bg-grey1">Entrar</button>
								</Form.Item>
							</Form>
						</Col>
					</Row>
			</div>
		</div>
		<div onClick={() => setOpenUserCredentialsModal(false)} className="fixed bg-[#000000] opacity-70 z-[2] top-0 left-0 right-0 bottom-0"></div>
		</>
	)

}

export default LoginModal;