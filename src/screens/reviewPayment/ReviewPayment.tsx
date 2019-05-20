import React, { useEffect, useState } from 'react';
import Template from 'src/components/pageTemplate/template';
import { MessageText } from 'src/components/messages/info';
import { H3, P, Button } from 'common/selectors';
import { ReviewPaymentStyled, GoBack, ButtonContainer, MessageTextContainer } from './style';
import PaymentInformation from 'src/components/paymentInformation/PaymentInformation';
import { Link, navigate } from 'gatsby';
import { Redirect } from '@reach/router';

const IntlNumber = number => new Intl.NumberFormat('ja-JP').format(number);

const IndexPage = props => {
	return (
		<>
			<Template hide="terms" step={5} title={{ main: 'My Kin Wallet', sub: 'Send Kin from your account' }}>
				<ApprovePayment {...props} />
			</Template>
		</>
	);
};

interface IReviewPaymentStyled {
	store: {
		errors: string[];
		blockchain: {
			publicKey: string;
			account: object;
			derviationPath: string;
			unsignedTransaction: object;
			signedTransaction: object;
			isLedgerConnected: boolean;
			secret: string;
		};
		transactionForm: {
			destinationAccount: string;
			kinAmount: string;
			memo: string;
		};
	};
	actions: {
		resetAll: Function;
		setSignTransaction: Function;
	};
}

const ApprovePayment: React.FunctionComponent<IReviewPaymentStyled> = ({ store, actions }) => {
	// hide the button if error disable progress
	const [transactionRegular, setTransactionRegular] = useState(true);
	const handleApprove = () => {
		const { derviationPath, unsignedTransaction } = store.blockchain;
		// ledger sign
		if (store.blockchain.ledgerConnected) navigate('/approve-payment');
		// keyPair sign
		else actions.setSignTransactionKeyPair([store.blockchain.secret, unsignedTransaction]);
	};
	useEffect(() => {
		if (store.blockchain.signedTransaction || !store.blockchain.unsignedTransaction) navigate('/transaction-approved');
		if (store.errors[0] === 'Destination account does not exist' || store.errors[0] === 'Destination account not valid')
			setTransactionRegular(false);
	}, [store.blockchain.signedTransaction, store.errors]);

	// const { balance } = store.blockchain.account.balances[0];
	// const { kinAmount } = store.transactionForm;
	return (
		<ReviewPaymentStyled>
			<Link to="/transaction">
				<GoBack>{'<- Edit transaction details'}</GoBack>
			</Link>
			<H3>Review Payment</H3>
			<P>Verify the payment details to continue</P>
			{store.transactionForm.kinAmount && store.blockchain.unsignedTransaction && (
				<PaymentInformation
					network={'Public'}
					amount={store.transactionForm.kinAmount}
					publicAddress={store.transactionForm.destinationAccount}
					balance={IntlNumber(Number(store.blockchain.account.balances[0].balance) - Number(store.transactionForm.kinAmount))}
				/>
			)}
			<MessageTextContainer visible={transactionRegular}>
				<MessageText text="Once you send payment it is not possible to cancel the transaction." />
			</MessageTextContainer>
			<ButtonContainer visible={transactionRegular}>
				<Button onClick={handleApprove}>Approve</Button>
			</ButtonContainer>
		</ReviewPaymentStyled>
	);
};
export default IndexPage;
