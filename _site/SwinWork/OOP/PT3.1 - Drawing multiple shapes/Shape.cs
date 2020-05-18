using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SwinGameSDK;

namespace MyGame
{
    public class Shape
    {
        private Color _color;
        private float _x, _y;
        private int _height, _width;

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

        public int Width
        {
            get
            {
                return _width;
            }
            set
            {
                _width = value;
            }
        }

        public int Height
        {
            get
            {
                return _height;
            }
            set
            {
                _height = value;
            }
        }

        public Shape()
        {    
            _color = Color.Green;
            _x = 0;
            _y = 0;
            _width = 100;
            _height = 100;
        }

        public Shape(Point2D pt)
        {
            _color = Color.Green;
            _x = pt.X;
            _y = pt.Y;
            _width = 100;
            _height = 100;
        }
        
        //Draw shape on screen
        public void Draw()
        {
            SwinGame.FillRectangle(Color,
                                   X,
                                   Y,
                                   Width,
                                   Height);

            if (_selected == true)
                DrawOutline();
        }

        //check if position is in shape or not
        public bool IsAt(Point2D _point2D)
        {
            return SwinGame.PointInRect(_point2D, X, Y, Width, Height);
        }

        //_selected field
        private bool _selected;
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

        public void DrawOutline()
        {
           SwinGame.DrawRectangle(Color.Black,
                                  X-2,
                                  Y-2,
                                  Width+4,
                                  Height+4);
        }
    }
}
