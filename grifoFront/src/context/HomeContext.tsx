import { createContext, useState } from "react"
import { Obra } from "../types/Obra"

interface IHomeContext {
	openUserCredentialsModal: boolean
	setOpenUserCredentialsModal: (openUserCredentialsModal: boolean) => void
	postFichaModal: boolean
	setPostFichaModal: (postFichaModal: boolean) => void
	postObraModal: boolean
	setPostObraModal: (postObraModal: boolean) => void
	bemMovel: boolean
	setBemMovel: (bemMovel: boolean) => void
	bemImovel: boolean
	setBemImovel: (bemImovel: boolean) => void
	obraId: number | null
	setObraId: (obraId: number | null) => void
	newObra: Obra[]
	setNewObra: (newObra: Obra[]) => void
}

export const HomeContext = createContext<IHomeContext>({} as IHomeContext)

const HomeProvider = (props: any) => {
	const [openUserCredentialsModal, setOpenUserCredentialsModal] = useState<boolean>(false)
	const [postObraModal, setPostObraModal] = useState<boolean>(false)
	const [postFichaModal, setPostFichaModal] = useState<boolean>(false)
	const [bemMovel, setBemMovel] = useState<boolean>(false)
	const [bemImovel, setBemImovel] = useState<boolean>(false)
	const [obraId, setObraId] = useState<number | null>(null)
	const [newObra, setNewObra] = useState<Obra[]>([])

	return (
		<HomeContext.Provider
			value={{
				openUserCredentialsModal, setOpenUserCredentialsModal,
				postObraModal, setPostObraModal,
				obraId, setObraId,
				bemMovel, setBemMovel,
				bemImovel, setBemImovel,
				newObra, setNewObra,
				postFichaModal, setPostFichaModal,
			}}
		>
			{props.children}
		</HomeContext.Provider>
	)
}
export default HomeProvider
