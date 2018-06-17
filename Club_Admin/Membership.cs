using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClubAdmin
{
    class Membership
    {
        public Membership(string id)
        {
            _isValid = false;
            _id = id;
            _payment = null;
        }

        private bool _isValid;
        private string _id;
        public Payment _payment;

        public bool IsValid
        {
            get
            {
                return _isValid;
            }
            set
            {
                _isValid = value;
            }
        }

        public string Id
        {
            get
            {
                return _id;
            }
        }

        public Payment Payment
        {
            get
            {
                return _payment;
            }
            set
            {
                _payment = value;
            }
        }
    }
}
