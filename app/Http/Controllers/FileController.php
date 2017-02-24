<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileController extends Controller
{
	protected $v_path = 'uploads/video';
	protected $img_path = '/uploads/images';

    public function video(Request $request)
    {
    	if ($request->file('file')) {
                    $path = $this->v_path;
	                if (!file_exists(public_path($path))) {
			            mkdir(public_path($path), 0777, true);
			        } 
                    foreach ($request->file('file') as $file) {
	                        $name = $file->getClientOriginalName();
	                        // if(!file_exists($path.$name)){
	                        $file->move(public_path($path), $name);
	                        // } else{
	                        // 	return 'File already exists';
	                        // }
                        // $fabric->images()->create(['image_name' => $name, 'image_path' => $path, 'position'=>0, 'fabrics_id'=>$fabric->id]);
                    }
                // $fabric->save();
        }
    }

    public function images(Request $request)
    {
    	dd($request->all());
    }
}
