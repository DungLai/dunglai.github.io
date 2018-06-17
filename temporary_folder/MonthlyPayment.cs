using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClubAdmin
{
    class MonthlyPayment : Payment
    {
        public MonthlyPayment(CreditCardType creditCardType, string cardNumber) : base(creditCardType, cardNumber)
        {
        }

        // make payment every month
        public override void MakePayment()
        {
            throw new NotImplementedException();
        }
    }
}
