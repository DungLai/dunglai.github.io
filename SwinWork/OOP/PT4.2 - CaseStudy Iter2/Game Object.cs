using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaseStudy
{
    public abstract class GameObject : IdentifiableObject
    {
        //a longer textual description of the game object
        private string _description;

        private string _name;

        public GameObject(string[] ids, string name, string desc) : base(ids)
        {
            _description = desc;
            _name = name;
        }

        //short textual description of the game object
        public string Name
        {
            get
            {
                return _name;
            }
        }

        //name + firstId
        public string ShortDescription
        {
            get
            {
                return "a " + Name + " (" + FirstId + ")";
            }
        }

        //description in game, can be changed in child class
        public virtual string FullDescription
        {
            get
            {
                return _description;
            }
        }
    }
}
