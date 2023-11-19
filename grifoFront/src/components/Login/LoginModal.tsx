import { HomeContext } from "../../context/HomeContext";
import { useContext, useEffect } from 'react';
import { Button, Col, Form, Input, Row, message } from "antd"
import input from "antd/es/input";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { useNavigate } from "react-router-dom";

const LoginModal = () => {

    const { setOpenUserCredentialsModal } = useContext(HomeContext)
	const auth = useAuth()
	const navigate = useNavigate();
	const handleClick = async () => {
        setOpenUserCredentialsModal(false);
	};

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
			<div className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 results-modal--wrapper fixed z-[3] bg-white font-Helvetica rounded-[14px] border-grey3">
				<div className="flex items-center justify-center">
					<Row
						justify='center'
						align='middle'
						style={{
						height: '500px',
						width: '500px',
						zIndex: '3'
						}}
					>
						<Col span={12}>
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

								<Form.Item wrapperCol={{ offset: 8, span:16}}>
									<Button htmlType="submit" className="z-[4] bg-grey1">
										Entrar
									</Button>
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