import { HomeContext } from "../context/HomeContext";
import { useContext } from 'react';
import OutLineButton from "./OutlineButton";

const LoginModal = () => {

    const { setOpenUserCredentialsModal } = useContext(HomeContext)

	const handleDeleteReport = async () => {
        setOpenUserCredentialsModal(false);
	};

	return (
		<>
			<div className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 results-modal--wrapper fixed z-[251] p-[18px] bg-white font-Helvetica rounded-[14px] border-grey3 flex flex-col justify-center hover:shadow-md">
				<div className="flex items-center justify-center">
					<OutLineButton
						className="w-fit"
						onClick={() => {
							setOpenUserCredentialsModal(false)
						}}
					>
					</OutLineButton>
                    <OutLineButton
                        className="w-fit"
                        variant="failure"
                        onClick={handleDeleteReport}
                    >
                        Delete
                    </OutLineButton>
				</div>
			</div>
			<div onClick={() => setOpenUserCredentialsModal(false)} className="fixed bg-[#000000] opacity-70 z-[250] top-0 left-0 right-0 bottom-0"></div>
		</>
	)

}

export default LoginModal