using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SwinGameSDK;

namespace MyGame
{
    public abstract class Shape
    {
        private bool _selected;
        private Color _color;
        private float _x, _y;

        public Color Color
        {
            get
            {
                return _color;
            }
            set
            {
                _color = value;
            }
        }
        public bool Selected
        {
            get
            {
                return _selected;
            }
            set
            {
                _selected = value;
            }
        }
        public float X
        {
            get
            {
                return _x;
            }
            set
            {
                _x = value;
            }
        }
        public float Y
        {
            get
            {
                return _y;
            }
            set
            {
                _y = value;
            }
        }

        public Shape()
        {    
            _color = Color.Yellow;
        }

        public Shape(Color clr)
        {
            _color = clr;
        }

        //Draw shape on screen
        public abstract void Draw();

        //check if position is in shape or not
        public abstract bool IsAt(Point2D _point2D);

        public abstract void DrawOutline();
    }
}
