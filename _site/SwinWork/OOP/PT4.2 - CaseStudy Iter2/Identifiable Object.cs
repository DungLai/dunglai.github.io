using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaseStudy
{
    public abstract class IdentifiableObject
    {
        private List<String> _identifiers = new List<String>();

        // add list of passed string to list of identifier
        public IdentifiableObject(string[] idents)
        {
            foreach (string s in idents)
            {
                _identifiers.Add(s.ToLower());
            }
        }

        //check if the id is in list or not
        public bool AreYou(string id)
        {
            foreach (string s in _identifiers)
            {
                if (s == id.ToLower())
                {
                    return true;
                }
            }

            return false;
        }

        private static string GetFirstId(List<String> list)
        {
            return list.DefaultIfEmpty("").First();
        }

        //return the first string in the list or empty string if the list is empty
        //this will return "" because it run after string was put into list
            //private readonly string _firstId = GetFirstId(_identifiers);
        
        public string FirstId
        {
            get
            {
                return GetFirstId(_identifiers);
            }
        }

        //convert id to lower case then add to list of identifier
        public void AddIdentifier(string id)
        {
            _identifiers.Add(id.ToLower());
        }
    }
}
