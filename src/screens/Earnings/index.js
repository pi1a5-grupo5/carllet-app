import React from 'react'
import { BackButton, PageContainer } from '../../components'
import RegisterEarningForm from '../../components/orgs/RegisterEarningForm'

const EarningPage = ({ navigation }) => {
	return (
		<PageContainer>
			<BackButton navigation={navigation} title='Novo ganho' />
			<RegisterEarningForm navigation={navigation} />
		</PageContainer>
	)
}

export default EarningPage