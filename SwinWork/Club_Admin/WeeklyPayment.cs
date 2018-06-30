using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClubAdmin
{
    class WeeklyPayment : Payment
    {
        public WeeklyPayment(CreditCardType creditCardType, string cardNumber) : base(creditCardType, cardNumber)
        {
        }
         
        // make payment every week
        public override void MakePayment()
        {
            throw new NotImplementedException();
        }
    }
}
