import { createContext, useState } from "react"

interface IHomeContext {
	openUserCredentialsModal: boolean
	setOpenUserCredentialsModal: (openUserCredentialsModal: boolean) => void
}

export const HomeContext = createContext<IHomeContext>({} as IHomeContext)

const HomeProvider = (props: any) => {
	const [openUserCredentialsModal, setOpenUserCredentialsModal] = useState<boolean>(false)

	return (
		<HomeContext.Provider
			value={{
				openUserCredentialsModal, setOpenUserCredentialsModal,
			}}
		>
			{props.children}
		</HomeContext.Provider>
	)
}
export default HomeProvider
