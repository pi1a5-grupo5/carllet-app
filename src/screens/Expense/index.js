import React from 'react'
import { BackButton, PageContainer } from '../../components'

const ExpensePage = ({ navigation }) => {
	return (
		<PageContainer>
			<BackButton navigation={navigation} title='Minha conta' />
			
		</PageContainer>
	)
}

export default ExpensePage