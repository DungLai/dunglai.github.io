using System;
using SwinGameSDK;

namespace MyGame
{
    public class GameMain
    {
        public static void Main()
        {
            //Open the game window
            SwinGame.OpenGraphicsWindow("GameMain", 800, 600);
            //SwinGame.ShowSwinGameSplashScreen();

            //Create object (shape)
            Drawing myDrawing;
            myDrawing = new Drawing();

            // Game loop
            while (false == SwinGame.WindowCloseRequested())
            {
                //Fetch the next batch of UI interaction
                SwinGame.ProcessEvents();

                //Clear the screen
                SwinGame.ClearScreen(Color.White);  

                //Change x,y position of myShape after left mouse clicked
                if (SwinGame.MouseClicked(MouseButton.LeftButton))
                    myDrawing.AddShape(SwinGame.MousePosition());

                //Press space to change shape color
                if (SwinGame.KeyTyped((KeyCode)32)) /*32 is KeyCode of Space*/
                {
                    myDrawing.Background = SwinGame.RandomRGBColor(255);
                }

                //Draw everything on the screen
                myDrawing.Draw();

                //select a shape to change its color
                if (SwinGame.MouseClicked(MouseButton.RightButton))
                {
                    myDrawing.SelectShapesAt(SwinGame.MousePosition());
                }

                //Draw Framerate
                SwinGame.DrawFramerate(0,0);

                if (SwinGame.KeyTyped((KeyCode)127))
                {
                    myDrawing.DeleteSelectedShapes();
                }

                //Draw onto the screen
                SwinGame.RefreshScreen(60);
            }
        }
    }
}