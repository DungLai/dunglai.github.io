using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClubAdmin
{
    enum CreditCardType { amex, anz, com }

    abstract class Payment
    {
        public Payment(CreditCardType creditCardType, string cardNumber)
        {
            _creditCardType = CreditCardType;
            _cardNumber = CardNumber;
        }

        private CreditCardType _creditCardType;
        private string _cardNumber;

        public CreditCardType CreditCardType
        {
            get
            {
                return _creditCardType;
            }
            
            set
            {
                _creditCardType = value;
            }
        }

        public string CardNumber
        {
            get
            {
                return _cardNumber;
            }
            set
            {
                _cardNumber = value;
            }
        }

        public abstract void MakePayment();
    }
}
