using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClubAdmin
{
    class Member
    {
        public Member(string id, string name)
        {
            _id = id;
            _name = name;
            _membership = new Membership(id);
        }

        private string _name;
        private string _id;
        private Membership _membership; 

        public string Name
        {
            get
            {
                return _name;
            }
            set
            {
                _name = value;
            }
        }

        public string Id
        {
            get
            {
                return _id;
            }
        }

        public Membership Membership
        {
            get
            {
                return _membership;
            }
        }

        public void AddPayment(CreditCardType creditCardType, string cardNumber, string paymentType)
        {
            _membership.Payment = new MonthlyPayment(creditCardType, cardNumber);
            Membership.IsValid = true;
        }

    }
}
 