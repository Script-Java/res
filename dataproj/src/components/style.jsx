import util from "../assets/util_line.jpg";
import trans from "../assets/transformer.jpg";
import home from "../assets/home.jpg";
import gas from "../assets/gas.jpg";
import wind from "../assets/wind.jpg";
import nuclear from "../assets/nuclear.jpg";


export const stylesheet = [
    {
        selector: 'node',
        style: {
          'height': 50,
          'width': 50,
          'background-fit': 'cover',
          'border-color': '#000',
          'border-width': 3,
          'border-opacity': 0.5
        }
    },
    // Style for nodes
    
    {
        selector: ':selected',
        style: {
            'border-width': 3,
            'border-color': 'black'  // Selected border color changed to black for visibility
        }
    },
    {
        selector: '.loads',
        style: {
            'background-image': `url(${home})`,
            'background-fit': 'cover'
        }
    },
    {
        selector:'.trans',
        style: {
            'background-image': `url(${trans})`,
            'background-fit': 'cover',
            
        }
    },
    {
        selector: '.gas',
        style: {
            'background-image': `url(${gas})`,
            'background-fit': 'cover'

        }
    },
    {
        selector: '.wind',
        style: {
            'background-image': `url(${wind})`,
            'background-fit': 'cover'

        }
    },
    {
        selector: '.nuclear',
        style: {
            'background-image': `url(${nuclear})`,
            'background-fit': 'cover'

        }
    },
    {
        selector: '.gen',
        style: {
            'width': '40px',
            'height': '40px'
        }
    },
    {
        selector: '.bus',
        style: {
            
            'background-image': `url(${util})`,
            'background-fit': 'cover',
            'shape': 'ellipse',
            'width':'50px',
            'height':'50px'

        }
    },
    {
        selector: '.gen_line',
        style: {
            'width': 1,
            'line-style': 'dashed',
            'line-color': '#bbb',  // Edge color changed to light gray for subtle contrast
            'curve-style': 'bezier'
            
        }
    },
    {
        selector: '.lines',
        style: {
            'background-image': 'url(assets/line.jpg)',
            'background-fit': 'cover'
        }
    }
]